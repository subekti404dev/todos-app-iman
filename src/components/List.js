import React from 'react'
import AppStore from '../store';
import Event from '../services/event';
import { Col, Gap, ImgIcon, Padder, RenderIf, Row } from '../shared';
import Icons from '../assets/icons';
import moment from 'moment'
import { Confirm } from 'react-st-modal';


function List() {
  const [todosDone, setTodosDone] = React.useState([]);
  const [todosUndone, setTodosUndone] = React.useState([]);
  const [mode, setMode] = React.useState(0);

  React.useEffect(() => {
    getData();
    Event.on('update-data', () => {
      getData();
    });
    Event.on('move-to-undone', () => {
      setMode(0)
    })
  },
    // eslint-disable-next-line 
    [])

  const getData = () => {
    const data = AppStore.todos.data || [];
    setTodosDone(data.filter(x => x.done));
    setTodosUndone(data.filter(x => !x.done));
  }

  const source = () => {
    return mode === 0 ? todosUndone : todosDone;
  }

  const doneUndone = async (item) => {
    await AppStore.todos.editItem(item._id,
      {
        done: !item.done,
        updatedAt: new Date(),
      });
    await AppStore.todos.uploadIfOnline();
    _moveState(item);
  }

  const remove = async (item) => {
    const result = await Confirm(`Are you sure you want to remove this "${item.text}"`, 'Warning', 'Yes', 'No');
    if (result) {
      _removeState(item);
      await AppStore.todos.deleteItem(item._id);
      await AppStore.todos.uploadIfOnline();
    }
  }

  const _removeState = (item) => {
    const source = item.done ? todosDone : todosUndone;
    const setSource = item.done ? setTodosDone : setTodosUndone;
    setSource(source.filter(x => x._id !== item._id));
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
        <Gap vertical size={10} />
        <div
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            // minHeight: 200
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
            {source().map((data, i) => {
              const isLast = source().length === i + 1;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    borderBottom: `${isLast ? 0 : 1}px solid #dadada`,
                    height: 60,
                    alignItems: 'center',
                    padding: "10px 0",
                  }}>
                  <Row>
                    <Col onClick={() => doneUndone(data)} justifyCenter pointer>
                      <Row>
                        <Col>
                          <div style={{ fontWeight: 'bold', fontSize: 20 }}>{data.text}</div>

                          <div style={{ fontSize: 13, color: 'grey', display: 'flex', flexDirection: 'row' }}>{'Tags: '}<div style={{ fontStyle: 'italic', marginLeft: 5 }}>{data.tags.join(', ')}</div></div>
                        </Col>
                        <Col justifyCenter alignEnd>
                          <div style={{ fontSize: 15, color: 'grey', marginRight: 20 }}>{moment(data.createdAt).format('DD MMM YYYY')}</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col width={20} alignEnd justifyCenter pointer>
                      <div onClick={() => { remove(data) }}>
                        <ImgIcon src={Icons.remove} size={18} />
                      </div>
                    </Col>
                  </Row>
                </div>
              )
            })}
            <RenderIf condition={source().length === 0} >
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150, fontWeight: 'bold' }}>
                EMPTY
              </div>
            </RenderIf>
          </Padder>
        </div>
      </Col>
      <Col />
    </Row>


  );
}

export default List;
