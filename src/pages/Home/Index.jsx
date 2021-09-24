import React, {Component} from 'react';
import {Layout, Row, Col, Menu} from 'antd';
import * as Icons from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

import './Index.less';

class Index extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
      iframe: '',
    };
  }

  renderIcon = (icon) => {
    if (icon !== undefined && Icons[icon] !== undefined) {
      return Icons[icon]
    }
    return ''
  }

  renderSub = (router) => {
    router = router || SUMMARY;
    return (
      router.map((val) => {
        if (val.children !== undefined && val.children.length > 0) {
          return (
            <Menu.SubMenu
              key={val.path}
              title={
                <span>{this.renderIcon(val.icon)}<span>{val.name}</span></span>
              }>
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
      <Layout className="h-layout">
        <Row className="row" type="flex">
          <Col span={4}>
            <Menu
              theme="dark"
              inlineCollapsed={false}
              className="menu"
              mode="inline"
              selectedKeys={this.state.iframe}
              onClick={(evt) => {
                if (evt.key !== decodeURIComponent(location.pathname)) {
                  this.setState({
                    iframe: evt.key
                  })
                }
              }}
            >
              {this.renderSub(this.summary)}
            </Menu>
          </Col>
          <Col span={20}>
            <div className="h-git-page">
              <iframe src={GITHUB_PAGE_URL + '/' + this.state.iframe}/>
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }

}

export default withRouter(Index);
