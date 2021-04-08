import React from 'react';
import { Gap, RenderIf, Row, Tag, TextInput } from '../shared';

// const TagsZ = (props) => {
//   const [tags, setTags] = React.useState("")

//   const getTagArray = () => {
//     return tags.split(",").filter(x => x.trim()).map(tag => tag.trim());
//   }

//   const removeTag = (index) => {
//     const currTags = getTagArray();
//     currTags.splice(index, 1);
//     setTags(currTags.join(", "));
//   }

//   React.useEffect(() => {
//     if (props.value) {
//       setTags(props.value.join(", "));
//     }
//   },
//     // eslint-disable-next-line
//     [])

//   React.useEffect(() => {
//     onChange()
//   },
//     // eslint-disable-next-line
//     [tags]);

//   const onClear = () => {
//     setTags("")
//   }

//   const onChange = () => {
//     if (props.onChange) {
//       props.onChange(getTagArray());
//     }
//   }
//   return (
//     <div>
//       <TextInput
//         placeholder={"Tags (separate with comma)"}
//         fontSize={17}
//         value={tags}
//         onChange={(tags) => {
//           setTags(tags);
//         }}
//       />
//       <Gap vertical />
//       <Row wrap>
//         {getTagArray().map((tag, i) => {
//           return <Tag label={tag} key={i} onRemove={() => removeTag(i)} />
//         })}
//       </Row>
//     </div>
//   )
// }

class Tags extends React.Component {
  state = {
    tags: ""
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({ tags: this.props.value.join(", ") }, this.onChange);
    }
  }

  getTagArray = () => {
    return this.state.tags.split(",").filter(x => x.trim()).map(tag => tag.trim());
  }

  removeTag = (index) => {
    const currTags = this.getTagArray();
    currTags.splice(index, 1);
    this.setState({ tags: currTags.join(", ") }, this.onChange);
  }

  onChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.getTagArray());
    }
  }

  onClear = () => {
    this.setState({ tags: "" }, this.onChange)
  }

  render() {
    return (
      <div>
        <TextInput
          placeholder={"Tags (separate with comma)"}
          fontSize={17}
          value={this.state.tags}
          onChange={(tags) => {
            this.setState({ tags }, this.onChange);
          }}
        />
        <RenderIf condition={this.getTagArray().length > 0} >
          <Gap vertical />
          <Row wrap>
            {this.getTagArray().map((tag, i) => {
              return <Tag label={tag} key={i} onRemove={() => this.removeTag(i)} />
            })}
          </Row>
        </RenderIf>
      </div>
    )
  }
}

export default Tags;