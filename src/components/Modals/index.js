import { get, goTo, post } from "../../helpers";



export const Modal = (target, data, cb) => {

  window.send = async (tr) => {
    console.log(data.find(elm => elm.id == tr));
    await _.deleteManager(tr)
  }
  window.cancel = async () => {
    _.goToSync("/managers")
  }


  return (`
    <div id="${target}"  class="modal">
      <div class="modal-box">
        <p>Deleting Manager with id :  ${(data.find(elm => elm.id == target.split('+')[1])).name} </p> 
        <input id="adminSelected" value="" hidden />
        <div class="modal-action">
          <label onclick="send('${(target.split('+'))[1]}')" for="target" class="btn bg-error">Accept</label> 
          <label onclick="cancel()" class="btn">Close</label>
        </div>
      </div>
    </div>
  `)
}


