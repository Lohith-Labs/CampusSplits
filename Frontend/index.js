//create group
const groupname=document.querySelector("#g-name");
const groupmember=document.querySelector("#g-member");
const memberbtn=document.querySelector("#grp-btn");
const memberlist=[];
memberbtn.addEventListener("submit",(event)=>{
    event.preventDefault();
    const addmember=groupmember.value.trim();
    if(addmember===""){
        return;
    }
    memberlist.push(addmember);
    updatearr();
    const membercontainer=document.querySelector("#members-container");

    const membercard=document.createElement("div");
    membercard.classList.add("members-list");
    const membername=document.createElement("span");
    membername.classList.add("member-name");
    membername.textContent=addmember;
    const delbutton=document.createElement("button");
    delbutton.textContent="X";
    delbutton.classList.add("delete-button");

    //adding
    membercontainer.append(membercard)
    membercard.append(membername,delbutton);
    //remove
    delbutton.addEventListener("click",()=>{
        const ind=memberlist.indexOf(addmember);
        membercard.remove();
        memberlist.splice(ind,1);
        updatearr();
    })
    //remove form value
    groupmember.value="";

    function updatearr(){
        selection.innerHTML="";
    for(let i=0;i<memberlist.length;i++){
    const options=document.createElement("option");
    options.textContent=memberlist[i];
    selection.append(options);
    }
   }
})

//add expence
const expencetitle=document.querySelector("#e-name");
const expenceamount=document.querySelector("#e-amount");
//splitting

const expencelead=document.querySelector("#lead");
const selection=document.createElement("select");
selection.classList.add("opt-list");
expencelead.append(selection);
selection.required="true";


const upiid=document.querySelector("#e-upi");
const addbtn=document.querySelector("#ad-btn");

let amountsum=0;
let expencecount=0;
let pendingsum=0;
addbtn.addEventListener("submit",(event)=>{
    event.preventDefault();
    
    
    const expenceconatiner = document.querySelector(".expence");
    // split-details
    const details = document.createElement("div");
    details.classList.add("split-details");

    // group-1=group-title+group-head
    const groupcardcontainer = document.createElement("div");
    groupcardcontainer.classList.add("group-1");

    // group-title
    const grouptitle=document.createElement("h3");
    grouptitle.classList.add("groupname");
    grouptitle.textContent=groupname.value.trim();
    const groupcardtitle = document.createElement("h6");
    groupcardtitle.textContent=expencetitle.value.trim();
    groupcardtitle.classList.add("group-title");

    

    // group-head
    const groupheadcontainer = document.createElement("div");
    groupheadcontainer.classList.add("group-head");
    const groupleadtext = document.createElement("p");
    groupleadtext.textContent = "Paid By ";
    
    const leadname = document.createElement("b");
    leadname.classList.add("s-lead");
    leadname.textContent=selection.value.trim();
    groupleadtext.append(leadname);
    

    // amoundetailescontainer
    const amountdetailscontainer = document.createElement("div");
    const totmoney = document.createElement("h6");
    totmoney.textContent="Total:"
    const moneyval = document.createElement("span");
    moneyval.textContent=expenceamount.value.trim()+"/-";
    moneyval.classList.add("s-amount");
    //split money details
    const splitamount=Math.round(Number(expenceamount.value/memberlist.length));

    //summery
    //summery amount
    const summeryamount=document.querySelector("#sum-price");
    const amount=Number(expenceamount.value.trim())
    amountsum+=amount;
    summeryamount.textContent=amountsum;
    

    //expences count
    expencecount+=1;
    const sumexpence=document.querySelector("#ex-count");
    sumexpence.textContent=expencecount;
    
    //h6+span
    totmoney.append(moneyval);
    amountdetailscontainer.append(totmoney);
    // button
    const billbutton = document.createElement("button");
    billbutton.textContent = "Pay Now";
    billbutton.classList.add("btn-bill");
    //button+span+button
    amountdetailscontainer.append(totmoney,billbutton);

  
    // membersinfo
    const membersinfo = document.createElement("ol");
    membersinfo.classList.add("listinfo")


    //member
   for(let i=0;i<memberlist.length;i++){
    const listitem=document.createElement("li");
    
    const listitemcontainer=document.createElement("div");
    listitemcontainer.classList.add("listdiv");
    const holdername=document.createElement("span");
    holdername.classList.add("holder")
    holdername.textContent=memberlist.at(i);

    const pricecontainer=document.createElement("p");
    const price=document.createElement("span");
    price.innerText=splitamount+"/-";


     //price status
    const pricestatus=document.createElement("span");
    if(selection.value===memberlist.at(i)){
    pricestatus.innerText="Success";
    pricestatus.style.color="green"; 
    pricestatus.classList.add("status");
    }
    else{
    pricestatus.innerText="Pending"; 
    pricestatus.classList.add("status");
    pendingsum+=splitamount;
    }


   /*  //pending amount status
    for(let i=0;i<memberlist.length;i++){
        if(pricestatus.value==="Pending"){
            pendingsum+=splitamount;
        }
    }
    
 */
    //p contains span+span
    pricecontainer.append(price,pricestatus);
    //div containes span and pricecontainer
    listitemcontainer.append(holdername,pricecontainer);
    //listitem contains div
    listitem.append(listitemcontainer);
    //ol contains li
    membersinfo.append(listitem);
}

    //pending amount
    const summerypending=document.querySelector("#s-pending");
    summerypending.textContent=pendingsum;



    //group-head
    groupheadcontainer.append(groupleadtext,amountdetailscontainer);

    // group card
    groupcardcontainer.append(
        grouptitle,
        groupcardtitle,
        groupheadcontainer,
        membersinfo
    );

   details.append(groupcardcontainer)

    // main container
    expenceconatiner.append(details);

    expencetitle.value="";
    expenceamount.value="";
    expencelead.value="";
    upiid.value="";
    groupname.value="";

});

const clrbtn=document.querySelector("#clr-btn");
clrbtn.addEventListener("click",()=>{
    //memers arr clear
    memberlist.length=0;

    //member card clear
    document.querySelectorAll(".members-list").forEach((each)=>{
        each.remove();
    });
    //sections
    selection.innerHTML="";
    //expencetitle
    expencetitle.value="";
    //expence amount
    expenceamount.value="";
    //upiid
    upiid.value="";
    
    //amount sum
    amountsum=0;
    //expence count
    expencecount=0;
    //pending sum
    pendingsum=0;

    //summery
    document.querySelector("#sum-price").textContent="0";
    document.querySelector("#ex-count").textContent="0";
    document.querySelector("#s-pending").textContent="0";
    
    //details container
    document.querySelectorAll(".split-details").forEach(details=>{
        details.remove();
    })
});
