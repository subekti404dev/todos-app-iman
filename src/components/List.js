import React from 'react'
import AppStore from '../store';
import Event from '../services/event';
import { Col, Gap, Padder, Row } from '../shared';

function List() {
  const [todosDone, setTodosDone] = React.useState([]);
  const [todosUndone, setTodosUndone] = React.useState([]);
  const [mode, setMode] = React.useState(0);
  const [lastUpdate, setLastUpdate] = React.useState(new Date());

  React.useEffect(() => {
    getData();
    Event.on('update-data', () => {
      console.log('update-data');
      getData();
    })
  },
    // eslint-disable-next-line 
    [])

  const getData = () => {
    const data = AppStore.todos.data || [];
    setTodosDone(data.filter(x => x.done));
    setTodosUndone(data.filter(x => !x.done));
    setLastUpdate(new Date());
  }

  const doneUndone = async (item) => {
    await AppStore.todos.editItem(item._id,
      {
        done: !item.done,
        updatedAt: new Date(),
      });
    await AppStore.todos.upload();
    _moveState(item);
  }

  const _moveState = (item) => {
    const source = item.done ? todosDone : todosUndone;
    const setSource = item.done ? setTodosDone : setTodosUndone;
    const destination = !item.done ? todosDone : todosUndone;
    const setDestination = !item.done ? setTodosDone : setTodosUndone;

    const currSource = source.filter(x => x._id !== item._id);
    setSource(currSource);

    const _cur = item
    _cur.done = !item.done;
    const currDestination = destination;
    currDestination.push(_cur);
    setDestination(currDestination);
  }

  return (
    <Row >
      <Col />
      <Col size={3}>
        <Gap vertical size={40} />
        <div
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            minHeight: 200
          }}>
          <Row>
            <Col
              height={45}
              color={mode === 0 ? '#3d2462' : 'grey'}
              fontColor={'white'}
              onClick={() => setMode(0)}
              borderTopLeftRadius={5}
              justifyCenter
              alignCenter
              bold
              pointer
            >
              TO BE DONE
            </Col>
            <Col
              height={45}
              color={mode === 1 ? '#3d2462' : 'grey'}
              fontColor={'white'}
              onClick={() => setMode(1)}
              borderTopRightRadius={5}
              justifyCenter
              alignCenter
              bold
              pointer
            >
              DONE
            </Col>
          </Row>
          <Padder horizontal={10}>
            {(mode === 0 ? todosUndone : todosDone).map((data, i) => {
              return (
                <div
                  key={i + lastUpdate}
                  onClick={() => doneUndone(data)}
                  style={{
                    display: 'flex',
                    borderBottom: `${1}px solid #dadada`,
                    height: 50,
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}>
                  {data.text}
                </div>
              )
            })}
          </Padder>
        </div>
      </Col>
      <Col />
    </Row>


  );
}

export default List;
