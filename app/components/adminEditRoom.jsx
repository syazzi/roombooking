import React, {useState} from 'react'
import RoomModal from './RoomModal';
import RoomEnableModal from './RoomEnableModal';

export default function adminEditRoom(props) {
  const [disableRoom, setDisableRoom] = useState(false);
  const [enableRoom, setEnableRoom] = useState(false);


  function close (){
    setDisableRoom(false)
  }
  function closeEnable (){
    setEnableRoom(false)
  }
  function open() {
    setDisableRoom(true)
  }
  function openEnable() {
    setEnableRoom(true)
  }
  return (
    <div>
        <table className="table">
          <thead>
            <tr><th></th><th></th></tr>
          </thead>
          <tbody>
            <tr>
                <td>Disable Room</td>
                <td className='text-right'><button onClick={()=>{open()}}>Open</button></td>
            </tr>
            <tr>
                <td>Enable Room</td>
                <td className='text-right'><button onClick={()=>{openEnable()}}>Open</button></td>
            </tr>
          </tbody>
        </table>
        <RoomModal show={disableRoom} setShow={setDisableRoom} onClose={close} rooms={props.rooms} user={props.user}/>
        <RoomEnableModal show={enableRoom} onClose={closeEnable} rooms={props.rooms} user={props.user}/>
      </div>
  )
}
