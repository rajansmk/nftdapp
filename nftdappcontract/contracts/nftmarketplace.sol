// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract nftmarketplace is ERC721URIStorage{
using Counters for Counters.Counter;
Counters.Counter private _tokenIds;
uint256 listingPrice = 0.025 ether; // 25000000000000000 WEI
address payable owner;

struct nftitem{
    uint tokenid;
    address seller;
    address owner;
    uint price;
    bool status;
}


mapping(uint => nftitem) private nftitemlist; // listing mapping
mapping(address => uint[]) public listingGroup; //0x00=[1,2,4]   // avoid for loop in all data if supposed to get one individual data
//mapping(address => uint[]) public notListingGroup; //0x00=[1,2,4] // avoid for loop in all data if supposed to get one individual data
constructor() ERC721("My NFT","NFT"){
    owner=payable(msg.sender) ;
}

//mint nft anyone free of cost
function createnfttoken(string memory _tokenURI)  public returns (uint){
    _tokenIds.increment();
    uint newtokenid=_tokenIds.current();
    //my not listing nft
    //notListingGroup[msg.sender].push(newtokenid); //0x00=[1,2,4] avoid for loop all values
    _mint(msg.sender,newtokenid);
    _setTokenURI(newtokenid,_tokenURI);
    return newtokenid;
}

// nft owner listing in the marketplace paying with listing fees
//  25000000000000000 WEI listing fees
// nft price if suppose 2000000000000000000
function nftlisting(uint _tokenid,uint _nftsaleprice) payable public{

    require(ERC721.ownerOf(_tokenid) == msg.sender, "You are not owner of this nft");
    require(msg.value==listingPrice,"Pay correct listing price");
    //require (nftitemlist[_tokenid].status != true,"already this nft in sale, you can not list again.please update price function");
    listingGroup[msg.sender].push(_tokenid); //0x00=[1,2,4] avoid for loop all values
    nftitemlist[_tokenid]=nftitem(_tokenid,msg.sender,address(this),_nftsaleprice,true);
    _transfer(msg.sender,address(this),_tokenid);
    payable(owner).transfer(listingPrice);
}

// get listing fees for seller
function nftlistingPrice() public view returns (uint256) {
      return listingPrice;
}

// get nft price to know for buyer
function gettokenprice(uint _tokenid) public view returns (uint){
     return nftitemlist[_tokenid].price;
}

// purchase nft from market place ,the seller will get money
function purchasenft(uint _tokenid) public payable{
    uint nftprice=nftitemlist[_tokenid].price;
    bool issale=nftitemlist[_tokenid].status;

    require(issale==true,"This nft not for sale right now");
    require(msg.value==nftprice,"nft price not same");
    
    address seller = nftitemlist[_tokenid].seller;
    require(seller !=msg.sender,"seller can not buy their own nft");
    nftitemlist[_tokenid].owner=msg.sender;
    nftitemlist[_tokenid].seller=address(0);
    nftitemlist[_tokenid].status=false;

    // array update
    listingGroupupdate(_tokenid,seller,msg.sender);
    _transfer(address(this),msg.sender,_tokenid);
    payable(seller).transfer(nftprice);
}
// this is function for avoid for loop all nft only aray data only loop for individual person nft
function listingGroupupdate(uint _tokenid,address preseller,address buyer) private{
    uint length = listingGroup[preseller].length;
        //uint[] memory newarray=new uint[](length);
        for(uint i=0;i < length;i++)
        {
            //address  tempaddress=buyer[i];
            if(listingGroup[preseller][i]==_tokenid) 
            {
                listingGroup[preseller][i]=0;
                listingGroup[buyer].push(_tokenid);
            }
        }
}
// only for our knowledge 
function mytoken() public view returns(uint[] memory)
{
        uint length = listingGroup[msg.sender].length;
        uint[] memory newarray=new uint[](length);
        for(uint i=0;i < length;i++)
        {
            //address  tempaddress=buyer[i];
            newarray[i]=listingGroup[msg.sender][i];
        }
        return newarray;  

}

// can update price even though listing
function priceUpdate(uint _tokenid,uint price) public{
    require(msg.sender==nftitemlist[_tokenid].seller,"You are not seller of this nft");
    nftitemlist[_tokenid].price=price;
}

function relisting(uint _tokenid,uint price) public payable{

    require(ERC721.ownerOf(_tokenid) == msg.sender, "You are not owner of this nft");
    require(msg.value==listingPrice,"Pay correct listing price");
    require(!nftitemlist[_tokenid].status,"status should be false");
     nftitemlist[_tokenid].status=true;
     nftitemlist[_tokenid].price=price;
     nftitemlist[_tokenid].owner=address(this);
     nftitemlist[_tokenid].seller=msg.sender;
     listingGroup[msg.sender].push(_tokenid);
    _transfer(msg.sender,address(this),_tokenid);
     payable(owner).transfer(listingPrice);

}

function nftOwner(uint _tokenid) public view returns(address){
    return nftitemlist[_tokenid].owner;
}

function nftSeller(uint _tokenid) public view returns(address){
    return nftitemlist[_tokenid].seller;
}

//get my listing nft count
function myListingNftCount() public view returns(uint){
    return listingGroup[msg.sender].length;
}

//get  my listing nft one by one from web3 ui
function myListingNft(uint _id) public view returns(uint,address,address,uint){
    //require(ERC721.ownerOf(_tokenid) == msg.sender, "You are not owner of this nft");
    uint _tokenid=listingGroup[msg.sender][_id];
    require (_tokenid > 0,"");
    return (nftitemlist[_tokenid].tokenid,
    nftitemlist[_tokenid].seller,
    nftitemlist[_tokenid].owner,
    nftitemlist[_tokenid].price);
}



/// @notice fetch list of NFTS owned/bought by this user
        function fetchMyNFTs() public view returns (nftitem[] memory){
            //get total number of items ever created
            uint totalItemCount = _tokenIds.current();

            uint itemCount = 0;
            uint currentIndex = 0;


            for(uint i = 0; i < totalItemCount; i++){
                //get only the items that this user has bought/is the owner
                if(nftitemlist[i+1].owner == msg.sender){
                    itemCount += 1; //total length
                }
            }

            nftitem[] memory items = new nftitem[](itemCount);
            for(uint i = 0; i < totalItemCount; i++){
               if(nftitemlist[i+1].owner == msg.sender){
                   uint currentId = nftitemlist[i+1].tokenid;
                   nftitem storage currentItem = nftitemlist[currentId];
                   items[currentIndex] = currentItem;
                   currentIndex += 1;
               }
            }
            return items;

        }


         /// @notice fetch list of NFTS owned/bought by this user
        function fetchItemsCreated() public view returns (nftitem[] memory){
            //get total number of items ever created
            uint totalItemCount = _tokenIds.current();

            uint itemCount = 0;
            uint currentIndex = 0;


            for(uint i = 0; i < totalItemCount; i++){
                //get only the items that this user has bought/is the owner
                if(nftitemlist[i+1].seller == msg.sender){
                    itemCount += 1; //total length
                }
            }

            nftitem[] memory items = new nftitem[](itemCount);
            for(uint i = 0; i < totalItemCount; i++){
               if(nftitemlist[i+1].seller == msg.sender){
                   uint currentId = nftitemlist[i+1].tokenid;
                   nftitem storage currentItem = nftitemlist[currentId];
                   items[currentIndex] = currentItem;
                   currentIndex += 1;
               }
            }
            return items;

        }

}
