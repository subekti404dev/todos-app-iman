import React from 'react'
import Tags from '../components/Tags';
import { Col, TextInput, Gap, Button, Padder } from '../shared';
import AppStore from '../store/index';
import Event from '../services/event';
import { useDialog } from 'react-st-modal';

function Form(props) {
  const [todoText, setTodoText] = React.useState("");
  const [todoTags, setTodoTags] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  let tagsRef;
  const dialog = useDialog();


  const addTodo = async () => {
    setLoading(true);
    await AppStore.todos.addItem({
      text: todoText, tags: todoTags,
      createdAt: new Date(),
      updatedAt: new Date(),
      done: false,
    });
    setTodoText("");
    if (tagsRef) tagsRef.onClear();
    await AppStore.todos.uploadIfOnline();
    Event.emit('move-to-undone');
    setLoading(false);
    dialog.close();
  }


  return (
    <Padder all={20}>

      <Col size={6}>
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
        <Gap vertical size={30} />

        <Button.Block
          disabled={!todoText}
          height={45}
          text={"OK"}
          loading={loading}
          onClick={() => {
            addTodo();

          }}
        />
      </Col>

    </Padder>
  );
}

export default Form;
