import throttle from "lodash.throttle";
const STORAGE_KEY="feedback-form-state";
const formData={};

const refs={
    myForm:     document.querySelector(".feedback-form"),
};
//-------------------------------------------------------------------------
refs.myForm.addEventListener("input",throttle(onFormInput,500));
refs.myForm.addEventListener("submit",onSubmit);
window.addEventListener("load",()=>{
    if(getStorageIteme(STORAGE_KEY)!==null)
    {
        //console.log("email" in getStorageIteme(STORAGE_KEY));
        if(checkProperty(getStorageIteme(STORAGE_KEY),"email")===true)
        {
            refs.myForm.elements.email.value=getStorageIteme(STORAGE_KEY).email;
        }
        if(checkProperty(getStorageIteme(STORAGE_KEY),"message")===true)
        {
            refs.myForm.elements.message.value=getStorageIteme(STORAGE_KEY).message;
        }
    }
});
//-------------------------------------------------------------------------------
function onFormInput(event){
    //console.log(setStorageItem(event.target,STORAGE_KEY));
    setStorageItem(event.target,STORAGE_KEY);
}

function onSubmit(event){
    event.preventDefault();
    console.log(formData);
    refs.myForm.reset();
    try
    {
        localStorage.removeItem(STORAGE_KEY);
    }
    catch(error){
        console.log(`${error.name}\n${error.message}`);
    }
}

function setStorageItem(element,key){

    try{
        formData[element.name]=element.value;
        localStorage.setItem(key,JSON.stringify(formData));
        return formData;
    }
    catch(error){
        console.log(`${error.name}\n${error.message}`);
    }
}

function getStorageIteme(key){
    try{
        return JSON.parse(localStorage.getItem(key));
    }
    catch(error){
        console.log(`${error.name}\n${error.message}`);
    }
}

function checkProperty(object, key){
    return key in object;
}