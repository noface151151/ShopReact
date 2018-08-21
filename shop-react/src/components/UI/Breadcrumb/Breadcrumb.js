import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import BreadcrumbMapName from "../../../shared/BreadcrumbMapName";

class BreadcrumbComponent extends Component {
  itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
    );
  };
  render() {
    const { href } = this.props;
    let pathSnippets = href
      .split("/")
      .slice(3, href.lenght)
      .filter(i => i);
    if (typeof pathSnippets === "undefined" || pathSnippets.length < 1) {
      pathSnippets.push("Home");
    }
    let routes = [];
    for (let i = 0; i < pathSnippets.length; i++) {
      const value = pathSnippets[i];
      if (typeof BreadcrumbMapName[value] !== "undefined") {
        routes.push({
          path: "/" + value,
          breadcrumbName: BreadcrumbMapName[value]
        });
      }
    }
   // console.log(routes);
    return <Breadcrumb itemRender={this.itemRender} routes={routes} />;
  }
}

export default BreadcrumbComponent;
