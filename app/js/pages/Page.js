import React from 'react';
import {
  View,
  NavBar,
} from 'amazeui-touch';
import {
  Link,
} from 'react-router';

import Page1 from './Page1';
import Page2 from './Page2';
import NotFound from './NotFound';

const pages = {
  Page1,
  Page2,
};

class Page extends React.Component {
  render() {
    let page = this.props.params.page;
    // 使用 query
    console.log(this.props.location.query);

    if (page) {
      page = page.charAt(0).toUpperCase() + page.slice(1);
    }

    const Component = pages[page] || NotFound;
    const backNav = {
      component: Link,
      icon: 'left-nav',
      title: '返回',
      to: '/',
      onlyActiveOnIndex: true,
    };

    return (
      <View>
        <NavBar
          title={page}
          leftNav={[backNav]}
          amStyle="primary"
        />
        <Component scrollable />
      </View>
    );
  }
}

export default Page;
