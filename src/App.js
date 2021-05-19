import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { login, fetchdata, add, edit, remove } from './functions';

function App() {
  const [logged, setlogged] = useState(localStorage.getItem('demo_token') === null ? "" : localStorage.getItem('demo_token'))

  const [data, setdata] = useState([])
  const [openform, setopenform] = useState(false)

  const [form, setform] = useState(
    {
      id: "",
      heading: "",
      description: "",
    }
  )

  useEffect(() => {


    fetchData();

    // console.log("Login status ", logged)



    // setdata(fetch())

  }, [logged])

  async function fetchData() {
    // You can await here
    console.log("fetch() : ", setdata(await fetchdata()))
    // const response = await MyAPI.getData(someId);
    // ...
  }

  const onchange = (e) => {
    // console.log(e.target.value);
    if (e.target.name === 'heading') {
      setform({ ...form, heading: e.target.value })
    }
    if (e.target.name === 'description') {
      setform({ ...form, description: e.target.value })
    }
  }

  const clearform = () => {
    setform(
      {
        id: "",
        heading: "",
        description: "",
      }
    )
  }

  const submitform = () => {
    if (form.heading === "") {
      alert("Heading cannot be empty")
      return 0
    }
    if (form.id == "") {
      // if no id then save
      let res = add(form);
      res.then(() => fetchData())
    }
    else {
      // if id then update
      let res = edit(form);
      res.then(() => fetchData())
    }


    clearform()
  }


  return (
    <div className="App">
      {logged ?
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div style={{ overflow: 'auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '82%', height: '80vh', borderRadius: '10px', border: "solid 5px #61DAFB" }}>
            <CUCard submitform={submitform} formdata={form} change={onchange} clearform={clearform}
              form={openform}
              openform={() => setopenform(true)}
              closeform={() => setopenform(false)} />

            {data.map((item, index) => <Card key={index} data={item}
              removeNote={async (id) => { let res = await remove(id); fetchData() }}
              editNote={(data) => { setform({ id: data.id, heading: data.heading, description: data.description }); setopenform(true) }
              }
            />)}


          </div>
          <p>
            Logged As super User
       </p>
          <button onClick={() => { setlogged(""); localStorage.removeItem('demo_token') }}         >
            Logout
       </button>
        </header>
        :
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            ReactJs Notes powered by django Backend
        </p>
          <button onClick={async () => {
            // await setlogged(console.log("Function worked ", login())) 
            await setlogged(login())
          }}      >
            Click here to get started
        </button>
        </header>
      }
    </div>
  );
}

export default App;


function Card({ data, removeNote, editNote }) {
  return (
    <div className="custome-card" style={{ margin: "20px", height: "300px", width: "200px", backgroundColor: `${data.note_background_color ? data.note_background_color : '#FFFFFF'}`, borderRadius: "10px" }}>
      {/* Header */}
      <div className="ccc fullwidth bgblack brt text" >{data.heading}</div>
      {/* Body */}
      <div style={{ flex: 1 }} className="ccc card-body">
        {/* <div >{data.heading}</div> */}
        <div >{data.description ? data.description : <i>{'No description'}</i>}</div>
        <span className="fullwidth">
          <button style={{ marginTop: '10px', width: "95px" }} onClick={() => removeNote(data.id)}  >Delete</button>
          <button style={{ marginTop: '10px', width: "95px" }} onClick={() => editNote(data)}>Edit</button>

        </span>
      </div>
      {/* Footer */}
      <div style={{ bottom: "0px" }} className="ccc fullwidth bgblack brb text">Footer</div>
    </div>
  )
}

function CUCard({ form, formdata, change, clearform, submitform, openform, closeform }) {



  return (
    <div className="custome-card" style={{ margin: "20px", height: "300px", width: "200px", backgroundColor: "#686868", borderRadius: "10px" }}>
      {/* Header */}
      <div className="ccc fullwidth bgblack brt text" >Header</div>
      {/* Body */}
      <div style={{ flex: 1 }} className="ccc card-body">
        {form ?
          <>
            {/* {formdata.id} */}
            <input value={formdata.heading} onChange={(e) => change(e)} name="heading" style={{ width: "180px" }} type="text" placeholder="heading" />
            <textarea value={formdata.description} onChange={(e) => change(e)} name="description" style={{ marginTop: '10px', width: "182px" }} placeholder="Description" />
            <span className="fullwidth">
              <button style={{ marginTop: '10px', width: "95px" }} onClick={() => { closeform(); clearform(); }}  >Cancell</button>
              {formdata.id ?
                <button onClick={() => submitform()} style={{ marginTop: '10px', width: "95px" }} >Update</button>
                :
                <button onClick={() => submitform()} style={{ marginTop: '10px', width: "95px" }} >Save</button>
              }



            </span>
          </>
          :
          <div onClick={() => { openform() }} className="new" style={{ cursor: "pointer", fontSize: '100px', color: 'rgb(5, 255, 188)' }}>+</div>
        }

      </div>
      {/* Footer */}
      <div style={{ bottom: "0px" }} className="ccc fullwidth bgblack brb text">Footer</div>
    </div>
  )
}