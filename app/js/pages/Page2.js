import React from 'react';
import {
  Container,
  Group,
  Slider,
} from 'amazeui-touch';

const sliderIntance = (
  <Slider>
    <Slider.Item>
      <img src="http://s.amazeui.org/media/i/demos/bing-1.jpg" />
    </Slider.Item>
    <Slider.Item><img src="http://s.amazeui.org/media/i/demos/bing-2.jpg" />
    </Slider.Item>
    <Slider.Item>
      <img src="http://s.amazeui.org/media/i/demos/bing-3.jpg" />
    </Slider.Item>
    <Slider.Item>
      <img src="http://s.amazeui.org/media/i/demos/bing-4.jpg" />
    </Slider.Item>
  </Slider>
);

export default class Page2 extends React.Component {
  render() {
    return (
      <Container {...this.props}>
        <Group
          header="Page 2"
          noPadded
        >
          {sliderIntance}
        </Group>
      </Container>
    );
  }
}
