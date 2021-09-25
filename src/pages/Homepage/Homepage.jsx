import React, { Component } from 'react';
import { Menu } from 'antd';
import * as Icons from "@ant-design/icons";
import './Homepage.less';

class Homepage extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.host = window.location.protocol + '//' + window.location.host;
    this.state = {
      active: null,
      page: null,
    };
  }

  componentDidMount() {
    this.toPage(SUMMARY[0].path);
  }

  toPage = (key) => {
    if (key !== this.state.page) {
      let page = key;
      if (key.substr(0, 6) === '<HOST>') {
        page = key.replace('<HOST>', this.host + '/');
      }
      this.setState({
        active: key,
        page: page,
      });
    }
  };

  renderIcon = (icon) => {
    if (icon === undefined) {
      return '';
    }
    if (Icons[icon] === undefined) {
      return '';
    }
    return React.createElement(Icons[icon]);
  };

  renderSub = (router) => {
    router = router || SUMMARY;
    return (
      router.map((val) => {
        if (val.children !== undefined && val.children.length > 0) {
          return (
            <Menu.SubMenu
              key={val.path}
              title={<span>{this.renderIcon(val.icon)}<span>{val.name}</span></span>}
            >
              {this.renderSub(val.children)}
            </Menu.SubMenu>
          );
        }
        return (<Menu.Item key={val.path}>{this.renderIcon(val.icon)}<span>{val.name}</span></Menu.Item>);
      })
    );
  };

  render() {
    return (
      <div className="page-homepage">
        <Menu
          className="menu"
          theme="dark"
          inlineCollapsed={false}
          mode="inline"
          selectedKeys={this.state.active}
          onClick={evt => this.toPage(evt.key)}
        >
          {this.renderSub(this.summary)}
        </Menu>
        <div className="h-git-page">
          <iframe title="page" src={this.state.page}/>
        </div>
      </div>
    );
  }
}

export default Homepage;
