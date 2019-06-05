import { mount } from '@vue/test-utils';
import Countdown from '../src/components/Countdown.vue';
import expect from 'expect';
import moment from 'moment';
import sinon from 'sinon';




describe('Counter', () => {
    let wrapper, clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();

        wrapper = mount(Countdown);
    });

    afterEach(() => clock.restore());



    it ('renders a countdown timer', () => {

        // console.log(new Date());

        wrapper.setProps({ until: moment().add(10, 'seconds.') });

        see('10 Seconds');

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
