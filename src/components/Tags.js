import React from 'react';
import { Gap, RenderIf, Row, Tag, TextInput } from '../shared';

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