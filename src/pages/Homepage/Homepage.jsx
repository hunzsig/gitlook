import React, { Component } from 'react';
import { Menu } from 'antd';
import * as Icons from "@ant-design/icons";
import './Homepage.less';
import { History, Parse } from "../../../vendor/h-react-antd";

class Homepage extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.host = window.location.protocol + '//' + window.location.host;
    this.search = Parse.urlSearch();
    this.title = document.title;
    this.summary = SUMMARY;
    this.id = 0;
    this.id2page = {};
    this.path2id = {};
    console.log(this.search);
    this.state = {
      active: null,
      page: null,
    };
  }

  componentDidMount() {
    if (this.search.id === undefined || this.id2page[this.search.id] === undefined) {
      this.toPage(this.summary[0].path);
    } else {
      this.toPage(this.id2page[this.search.id].path);
    }
  }

  toPage = (key) => {
    if (key !== this.state.page) {
      let page = key;
      if (key.substr(0, 6) === '<HOST>') {
        page = key.replace('<HOST>', this.host);
      }
      this.setState({
        active: key,
        page: page,
      });
      const id = this.path2id[key];
      const tit = this.title + ':' + this.id2page[id].name;
      document.title = tit;
      window.history.pushState(null, tit, this.host + Parse.urlEncode({ id: id }));
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
    router = router || this.summary;
    return (
      router.map((val) => {
        if (this.path2id[val.path] === undefined) {
          this.id = this.id + 1;
          this.id2page[this.id] = val;
          this.path2id[val.path] = this.id;
        }
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
          <iframe
            id="gpPageFrame"
            title="page"
            src={this.state.page}
          />
        </div>
      </div>
    );
  }
}

export default Homepage;
