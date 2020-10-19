import React, { Component } from "react";
import { fetchNotes, saveNotes, clearLocalStorage } from "../actions";
import { Layout, Button, Input, Menu, Icon, notification, Row, Col } from 'antd'
import styled from 'styled-components'

const {  Header, Content, Footer, Sider, } = Layout
const { TextArea } = Input

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      addOrUpdate: true,
      title: '',
      content: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.addNote = this.addNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.searchNotes = this.searchNotes.bind(this);
    this.clearStorage = this.clearStorage.bind(this);
  }

  clearStorage() {
    this.setState({ notes: [] })
    clearLocalStorage()
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value })  
  }

  addNote() {
    this.setState({
      addOrUpdate: true,
      title: '',
      content: ''
    })
  }

  selectNote({ title, content }) {
    this.setState({
      title,
      content,
      addOrUpdate: false,
    })
  }

  saveNote() {
    const { addOrUpdate } = this.state
    let { notes, title, content } = this.state
    if (!notes) notes = []
    const currentNoteIndex = notes && notes.find(note => note.title === title)
    if (!addOrUpdate && currentNoteIndex && title) {
      notes = notes.map(note => {
        if (note && note.title === title) return { title, content }
        return note
      })
    } else if (addOrUpdate && title) {
      notes.push({ title, content })
    } else {
      notification.open({
        message: 'Add or Update Error',
        description: 'Please check if there is same title and title is not Empty',
      });
    }
    
    this.setState({
      notes,
      title: '',
      content: ''
    })
    saveNotes(notes)
  }

  removeNote({note, e}) {
    e.stopPropagation();
    let { notes } = this.state;
    notes = notes.filter(item => item && note && item.title !== note.title);
    this.setState({
      notes,
      title: '',
      content: '',
      addOrUpdate: true
    })
    saveNotes(notes)
  }

  searchNotes(event) {
    const { notes } = this.state
    let searchStr = event.target.value
    if (searchStr) {
      searchStr = searchStr.toUpperCase()
      const matchedNotes = notes.filter(note => note.title.toUpperCase().includes(searchStr))
      this.setState({ notes: matchedNotes });
    } else {
      this.setState({ notes: fetchNotes() })
    }
  }

  componentDidMount() {
    let notes = fetchNotes();
    this.setState({ notes })
  }

  render () {
    const { notes, title, content } = this.state
    return (
      <StyledLayout>
        <Sider collapsedWidth="0" className="sider">
          <div className="search-wrapper">
            <Input placeholder="Search Notes" onChange={this.searchNotes} />
          </div>
          
          <Menu theme="dark" mode="inline">
            {notes && notes.map((note, index) => (
              <Menu.Item className="note-wrapper" key={index} onClick={() => this.selectNote(note)}>
                <span>{note && note.title}</span>
                <Icon type="delete" onClick={(e) => this.removeNote({note, e}) }/>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Layout>
          <Header>
            <Button type="primary" shape="circle" icon="plus" size="large" onClick={this.addNote} />
          </Header>

          <Content>
            <Row>
              <Col xs={24} sm={12}>
                <div className="title-wrapper">
                  <Input className="input-title" placeholder="title" name="title" value={title} onChange={this.handleInput} />
                </div>
                <div className="content-wrapper">
                  <TextArea className="input-content" placeholder="content" name="content" value={content} rows={10} onChange={this.handleInput} />
                </div>
                <div className="button-controls">
                  <Button type="primary" onClick={this.clearStorage}>Clear LocalStorage</Button>
                  <Button className="save-btn" type="primary" onClick={this.saveNote}>Save</Button>
                </div>
              </Col>
            </Row>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Ant Design
          </Footer>
        </Layout>
      </StyledLayout>
    )
  }
}

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  width: 100%;

  .sider {
    .search-wrapper {
      padding: 16px;
    }

    .ant-menu-item.note-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .ant-layout {
    .ant-layout-header {
      background-color: white;
      padding: 16px;
      line-height: 0;
      height: auto;
    }

    .ant-layout-content {
      margin: 24px 16px 0;
      padding: 24px;
      background-color: white;
      .title-wrapper {
        margin-bottom: 16px;
      }
      .content-wrapper {
        margin-bottom: 16px;
      }
      .button-controls {
        display: flex;
        justify-content: flex-end;
        .ant-btn {
          margin-left: 16px;
        }
      }
    }
  }
`

export default Home;
