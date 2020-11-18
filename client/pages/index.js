import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, InputGroup, Form, FormControl, ListGroup, Button, Container, Col, Row, Card, Toast } from 'react-bootstrap'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

function Home( ) {

  // all todos
  const [items, setItems] = useState([])
  // new todo
  const [newitem, setNewitem] = useState({complete:false, todotext:""})
  // data to be shown on toast
  const [toast, setToast] = useState({text:"",show:false})

  const [firstTime, setFirstTIme] = useState(true)
  
  const baseUrl = (process.browser)
                    ? (location.origin.split(":")[1] === "//localhost") 
                      ? 'http://localhost:9000/api' 
                      : location.origin.split(":")[0]+":"+location.origin.split(":")[1]+"/api" 
                    : 'http://localhost:9000/api';

  // API Calls

  // get all todos

  const getTodos = async () => {
      let url = baseUrl + "/"
      try{
        await fetch(url)
                        .then( _ => {
                          console.log(_.status);
                          return _.json()
                        }).then(result=>{
                          console.log(result)
                          setItems(result);
                        })
                        .catch( _ => {
                          setToast({text:"data get error",show:true})
                          console.log("error",_);
                        })
        
      }
      catch (e){
        console.log("Error : ",e);
      }
  }

  // change todo name in newtodo
  const changeNewitemName = (e) => setNewitem(
    (_newItem)=>{
      _newItem.todotext = e.target.value; 
      return {..._newItem}
    }
  )

  // change complete state in newtodo
  const changeNewitemComplete = (e) => setNewitem(
    (_newItem) => {
      _newItem.complete = e.target.checked;
      console.log(_newItem);
      return {..._newItem}
    }
  )

  // change the value complete of a todo
  const changeItemComplete = (e, item) => {
    NProgress.start()
    let url = baseUrl + "/" + item._id;
    item.complete = !item.complete
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    .then( _ => getTodos())
    .catch( _ => setToast({text:"todo update error",show:true}))
    NProgress.done()
  }

  // create a new todo
  const addItem = () => {
    NProgress.start()
    let data = {
      todotext : newitem.todotext,
      complete : newitem.complete,
    }
    setNewitem({complete:false, todotext:""})
    console.log(data);
    let url = baseUrl + "/"
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then( _ => {
      console.log(_.status);
      return _.json()
    }).then(result=>{
      console.log("result",result)
      getTodos();
    })
    .catch( _ => {
      setToast({text:"todo add error",show:true})
      console.log("error",_);
    })
    NProgress.done()
  }

  // delete a todo
  const deleteItem = (id) => {
    NProgress.start()
    let url = baseUrl + "/" + id;
    fetch(url,{
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then( _ => {
      getTodos();
    })
    .catch( () => {
      setToast({text:"todo delete error", show:true});
    })
    NProgress.done()
  }

  if(firstTime){
    getTodos()
    setFirstTIme(false) 
  }

  return (
    <>
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Next Based Todo App</Navbar.Brand>
    </Navbar>
    <Container>
       <Row  style={{marginTop:40 + 'px'}} >
         <Col xs="10">
          <Row>
            <h3 style={{paddingLeft:30+'px'}} >Add Todo</h3>
          </Row>
          <Row className="justify-content-xs-center" >
              <Col xs="10" >
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Checkbox onChange={changeNewitemComplete} checked={newitem.complete} />
                  </InputGroup.Prepend>
                  <FormControl onChange={changeNewitemName} placeholder="Add a new todo" id="addtodo" value={newitem.todotext} />
                </InputGroup>
              </Col>
              <Col xs="2" >
                  <Button onClick={addItem} id="addtodobutton" variant="outline-primary">Add Todo</Button>{' '}
              </Col>
          </Row>
         </Col>
         <Col xs="2" >
            <Toast onClose={() => setToast({text:"",show:false})} show={toast.show} delay={1000} autohide>
            <Toast.Header>
              <strong className="mr-auto">Error</strong>
            </Toast.Header>
              <Toast.Body>{toast.text}</Toast.Body>
            </Toast>
         </Col>    
       </Row>
       <Row id="items" >
         { 
          items.map( 
            item => ( 
                <Col key={item._id}  >
                  <Card border={ item.complete == true ? "success" : "primary" } style={{ width: '18rem', marginTop: 20+"px" }}>
                    <Card.Header>{item._id}</Card.Header>
                    <Card.Body>
                      <Card.Title>{item.todotext}</Card.Title>
                      <ListGroup variant="flush">
                          <ListGroup.Item> Completed ? <Form.Check onChange={(e)=>changeItemComplete(e,item)} checked={item.complete} type="checkbox" id={item._id} /></ListGroup.Item>
                          <ListGroup.Item><Button variant="outline-danger" size="sm" onClick={() => deleteItem(item._id)} >Delete</Button></ListGroup.Item>
                      </ListGroup>
                      
                    </Card.Body>
                  </Card>
                </Col> 
                )
              )
          }
       </Row>
    </Container>
    </>
  )
}

// Home.getInitialProps = async (ctx) => {
//   try{
//     var res = await fetch("http://localhost:9000/api/")
//   }
//   catch(err) {
//     console.log("error -----------------------------------  ",err);
//     console.log("initial load error");
//     return {data: []}
//   }
//   const data = await res.json()
//   console.log("data ---------------------- /n",data);
//   return { data: data }
  
// }


export default Home