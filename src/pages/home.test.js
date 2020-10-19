import React from 'react'
import {mount} from 'enzyme'

import Home from './home'

describe('HomePage', () => {
  it('should be able to add note', () => {
    const component = mount(<Home />)
    let inputTitle =component.find('.input-title').first();
    let inputContent =component.find('.input-content').first();
    let saveBtn = component.find('.save-btn').first();
    inputTitle.simulate('change', { target: { value: 'test title', name: 'title' } })
    inputContent.simulate('change', { target: {value: 'description', name: 'content' }})
    saveBtn.simulate('click');
    let notes = JSON.parse(global.localStorage.getItem('notes'));
    expect(notes.length).toBe(1);
    expect(notes[0].title).toBe('test title');
    expect(notes[0].content).toBe('description')
  })

  it('should be able to edit first note', () => {
    const component = mount(<Home />)
    let noteItem =component.find('.note-wrapper').first();
    let inputContent =component.find('.input-content').first();
    let saveBtn = component.find('.save-btn').first();
    noteItem.simulate('click');
    inputContent.simulate('change', { target: {value: 'description updated', name: 'content' }})
    saveBtn.simulate('click');
    let notes = JSON.parse(global.localStorage.getItem("notes"));
    expect(notes.length).toBe(1);
    expect(notes[0].content).toBe('description updated');
    expect(notes[0].title).toBe('test title');
  })

  it('should be able to delete first note', () => {
    window.confirm = jest.fn(() => true)
    const component = mount(<Home />)
    let noteItem =component.find('.note-wrapper').first();
    let deleteBtn = noteItem.find('.anticon')
    deleteBtn.simulate('click');
    let notes = JSON.parse(global.localStorage.getItem("notes"));
    expect(notes.length).toBe(0);
  })
})