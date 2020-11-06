import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, InputGroup, Form, FormControl, ListGroup, Button, Container, Col, Row, Card } from 'react-bootstrap'

function Home( {data} ) {

  const [items, setItems] = useState(data)
  const [newitem, setNewitem] = useState({complete:false, todotext:""})

  const baseUrl = "http://localhost:9000/api";

  // API Calls

  const getTodos = async () => {
      let url = baseUrl + "/"
      try{
        let res = await fetch(url);
        let todos = await res.json();
        console.log(todos);
        setItems(todos);
      }
      catch (e){
        console.log("Error : ",e);
      }
  }

  const changeNewitemName = (e) => setNewitem(
    (_newItem)=>{
      _newItem.todotext = e.target.value; 
      return {..._newItem}
    }
  )

  const changeNewitemComplete = (e) => setNewitem(
    (_newItem) => {
      _newItem.complete = e.target.checked;
      console.log(_newItem);
      return {..._newItem}
    }
  )

  const changeItemComplete = (e, name) => {
    setItems(_items => {
      for(let i=0; i<_items.length; i++){
        if(_items[i].todotext == name){
          _items[i].complete = e.target.checked;
          break;
        }
      }
      console.log(_items);
      return [..._items]
    })
  }

  const addItem = () => {
    let data = {
      todotext : newitem.todotext,
      complete : newitem.complete,
    }
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
      getTodos();
    }).then(result=>{
      console.log(result)
      setNewitem({complete:false, todotext:""})
    })
    .catch( _ => {
      console.log("error",_);
    })
  }

  const deleteItem = (name) => {
    setItems(_items => {
      for(let i=0; i<_items.length; i++){
        if (_items[i].todotext == name){
          _items.splice(i,1);
          break;
        }
      }
      return [..._items]
    })
  }

  return (
    <>
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Next Based Todo App</Navbar.Brand>
    </Navbar>
    <Container>
       <Row  style={{marginTop:40 + 'px'}} >
         <Col >
          <Row>
            <h3 style={{paddingLeft:30+'px'}} >Add Todo</h3>
          </Row>
          <Row className="justify-content-xs-center" >
              <Col xs="10" >
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Checkbox onChange={changeNewitemComplete} checked={newitem.complete} />
                  </InputGroup.Prepend>
                  <FormControl onChange={changeNewitemName} placeholder="Add a new todo" value={newitem.todotext} />
                </InputGroup>
              </Col>
              <Col xs="2" >
                  <Button onClick={addItem} variant="outline-primary">Add Todo</Button>{' '}
              </Col>
          </Row>
         </Col>    
       </Row>
       <Row>
         { 
          items.map( 
            item => ( 
                <Col>
                  <Card border={ item.complete == true ? "success" : "primary" } style={{ width: '18rem', marginTop: 20+"px" }}>
                    <Card.Header>{item._id}</Card.Header>
                    <Card.Body>
                      <Card.Title>{item.todotext}</Card.Title>
                      <ListGroup variant="flush">
                          <ListGroup.Item> Completed ? <Form.Check onChange={(e)=>changeItemComplete(e,item.todotext)} checked={item.complete} type="checkbox" id={item.todotext} /></ListGroup.Item>
                          <ListGroup.Item><Button variant="outline-danger" size="sm" onClick={() => deleteItem(item.todotext)} >Delete</Button></ListGroup.Item>
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

Home.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:9000/api")
  const data = await res.json()
  return { data: data }
}


export default Home