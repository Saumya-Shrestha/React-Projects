import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import { Trash, Pencil } from "react-bootstrap-icons";

class App extends Component {
  constructor(props) {
    super(props);

    // Setting up state
    this.state = {
      userInput: "",
      list: [],
    };
  }

  // Set a user input value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  // Add item if user input is not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        // Add a random id which is used to delete
        id: Math.random(),

        // Add a user value to list
        value: this.state.userInput,
      };

      // Update list
      const list = [...this.state.list];
      list.push(userInput);

      // reset state
      this.setState({
        list,
        userInput: "",
      });
    }
  }

  // Function to delete item from list using id
  deleteItem(key) {
    const list = [...this.state.list];

    // Filter values and leave value which we need to delete
    const updateList = list.filter((item) => item.id !== key);

    // Update list in state
    this.setState({
      list: updateList,
    });
  }

  editItem = (index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...todos];
      updatedTodos[index].value = editedTodo;
      this.setState({
        list: updatedTodos,
      });
    }
  };

  render() {
    return (
      <Container className="mt-5">
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
            color: "#4A90E2",
          }}
        >
          TODO LIST
        </Row>

        <hr style={{ borderTop: "2px solid #4A90E2" }} />
        <Row className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Add item . . . "
                size="lg"
                value={this.state.userInput}
                onChange={(item) => this.updateInput(item.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
                style={{ borderRadius: "10px 0 0 10px" }}
              />
              <Button
                variant="primary"
                onClick={() => this.addItem()}
                style={{ borderRadius: "0 10px 10px 0" }}
              >
                ADD
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <ListGroup>
              {/* map over and print items */}
              {this.state.list.map((item, index) => {
                return (
                  <ListGroup.Item
                    key={item.id}
                    action
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      padding: "10px 15px",
                    }}
                    className="hover-shadow"
                  >
                    <span style={{ flex: 1, marginRight: "10px" }}>
                      {item.value}
                    </span>
                    <span>
                      <Button
                        variant="outline-danger"
                        onClick={() => this.deleteItem(item.id)}
                        style={{ marginRight: "10px", borderRadius: "5px" }}
                      >
                        <Trash />
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={() => this.editItem(index)}
                        style={{ borderRadius: "5px" }}
                      >
                        <Pencil />
                      </Button>
                    </span>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
