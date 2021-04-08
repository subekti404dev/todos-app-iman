import React from 'react'
import Tags from '../components/Tags';
import { Row, Col, TextInput, Gap, Button } from '../shared';
import AppStore from '../store/index';
import Event from '../services/event';

function Form() {
  const [todoText, setTodoText] = React.useState("");
  const [todoTags, setTodoTags] = React.useState([]);
  let tagsRef;

  const addTodo = async () => {
    await AppStore.todos.addItem({
      text: todoText, tags: todoTags,
      createdAt: new Date(),
      updatedAt: new Date(),
      done: false,
    });
    await AppStore.todos.uploadIfOnline();
    setTodoText("");
    if (tagsRef) tagsRef.onClear();
    Event.emit('update-data');
    Event.emit('move-to-undone');
  }


  return (
    <Row >
      <Col />
      <Col size={3}>
        <TextInput
          placeholder={"Todo Text ..."}
          fontSize={17}
          value={todoText}
          onChange={(text) => setTodoText(text)}
        />
        <Gap vertical />
        <Tags
          ref={x => {
            if (x) {
              tagsRef = x;
            }
          }}
          value={todoTags}
          onChange={(tags) => setTodoTags(tags)}
        />
        <Gap vertical />

        <Button.Block
          disabled={!todoText}
          height={45}
          text={"OK"}
          onClick={() => {
            addTodo();
          }}
        />
      </Col>
      <Col />
    </Row>
  );
}

export default Form;
