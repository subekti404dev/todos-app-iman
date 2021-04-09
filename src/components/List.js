import React from 'react'
import AppStore from '../store';
import Event from '../services/event';
import { Col, Gap, ImgIcon, Padder, RenderIf, Row } from '../shared';
import Icons from '../assets/icons';
import moment from 'moment'
import _ from 'lodash';
import { Confirm } from 'react-st-modal';


function List() {
  const [todosDone, setTodosDone] = React.useState([]);
  const [todosUndone, setTodosUndone] = React.useState([]);
  const [unuploadeds, setUnuploadeds] = React.useState(0);
  const [mode, setMode] = React.useState(0);

  React.useEffect(() => {
    getData();
    Event.on('move-to-undone', () => {
      setMode(0)
    })
    const unsubTodos = AppStore.todos.subscribe(() => {
      getData();
    })

    return () => {
      unsubTodos();
    }
  },
    // eslint-disable-next-line 
    [])

  const getData = () => {
    const data = AppStore.todos.data || [];
    setUnuploadeds(AppStore.todos.countUnuploadeds());
    setTodosDone(sortByCreatedAt(data.filter(x => x.done)));
    setTodosUndone(sortByCreatedAt(data.filter(x => !x.done)));
  }

  const sortByCreatedAt = (data) => {
    return _.sortBy(data, 'createdAt').reverse();
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
  }

  const remove = async (item) => {
    const result = await Confirm(`Are you sure you want to remove this "${item.text}"`, 'Warning', 'Yes', 'No');
    if (result) {
      await AppStore.todos.deleteItem(item._id);
      await AppStore.todos.uploadIfOnline();
    }
  }

  return (
    <Row >
      <Col />
      <Col size={3}>
        <Gap vertical size={10} />
        <RenderIf condition={unuploadeds > 0}>
          <div style={{ fontStyle: 'italic', color: 'grey' }}>{`${unuploadeds} unuploaded changes`}</div>
        </RenderIf>
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
                  className="list-item"
                  style={{
                    borderBottom: `${isLast ? 0 : 1}px solid #dadada`,
                  }}>
                  <Row>
                    <Col onClick={() => doneUndone(data)} justifyCenter pointer>
                      <Row>
                        <Col>
                          <div className="list-item-content">{data.text}</div>
                          <div className="list-item-tags">{'Tags: '}<div style={{ fontStyle: 'italic', marginLeft: 5 }}>{data.tags.join(', ')}</div></div>
                        </Col>
                        <div className="list-item-date-container">
                          <div className="list-item-date">{moment(data.createdAt).format('DD MMM YYYY')}</div>
                          <div className="list-item-time">{moment(data.createdAt).format('HH:mm')}</div>
                        </div>
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
              <div className="list-empty-container">
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
