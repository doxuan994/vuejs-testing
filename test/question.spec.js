import { mount } from '@vue/test-utils';
import Question from '../src/components/Question.vue';
import expect from 'expect';

import axios from 'axios'
import moxios from 'moxios'


describe('Question', () => {
    let wrapper;

    beforeEach(() => {
        moxios.install();
        wrapper = mount(Question, {
            propsData: {
                question: {
                    title: 'The Title',
                    body: 'The Body'
                }
            }
        });
    });

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall()
    })


    it ('presents the title and the body', () => {
        see('The Title');
        see('The Body');
    });


    it ('can be edited', () => {
        expect(wrapper.contains('input[name=title]')).toBe(false);

        wrapper.find('#edit').trigger('click');

        expect(wrapper.find('input[name=title]').element.value).toBe('The Title');
        expect(wrapper.find('textarea[name=body]').element.value).toBe('The Body');
    });

    it ('hides the edit button during edit mode', () => {
        wrapper.find('#edit').trigger('click');

        expect(wrapper.contains('#edit')).toBe(false);
    });


    it.only ('updates the question after being edited', (done) => {
        wrapper.find('#edit').trigger('click');

        type('input[name=title]', 'Changed Title');
        type('textarea[name=body]', 'Changed Body');

        moxios.stubRequest('/questions/\.+/', {
            status: 200,
            response: {
                title: 'Changed Title',
                body: 'Changed Body'
            }
        })



        click('#update');

        see('Changed Title');
        see('Changed Body');

        moxios.wait(() => {
            see('Your question has been updated.');

            done();
        });


    });





    it ('can cancel out of the edit mode', () => {
        click('#edit');

        type('input[name=title]', 'Changed Title');

        click('#cancel');

        see('The Title')
    });








    let click = selector => {
        wrapper.find(selector).trigger('click');
    }


    let type = (selector, text) => {
        let node = wrapper.find(selector);


        node.element.value = text;
        node.trigger('input');
    }



    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrapper.html()).toContain(text);
    };



});
