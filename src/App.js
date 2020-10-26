import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Layout, Menu, Typography, Input, Divider } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    SendOutlined,
    TagsOutlined,
    QuestionOutlined,
} from "@ant-design/icons";
import ReactGA from "react-ga";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import logoColored from "./images/biryani-color.svg";
import Post from "./pages/post/post";
import randomColor from "./utils/randomColor";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const App = () => {
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        ReactGA.initialize("UA-175675614-1");
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    useEffect(() => {
        const width = window.innerWidth;
        if (width > 790) {
            setCollapsed(false);
        }
    }, []);

    const history = useHistory();

    const onHomeClick = () => {
        history.push("/");
    };

    const onAboutClick = () => {
        history.push("/about");
    };

    const onPostClick = () => {
        history.push("/post");
    };

    return (
        <>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{
                        background: "#202025",
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                    }}
                >
                    {collapsed ? (
                        <Typography.Title
                            level={2}
                            style={{ color: randomColor() }}
                            className="logo"
                            onClick={onHomeClick}
                        >
                            <img
                                className="logo-img"
                                alt={logoColored}
                                src={logoColored}
                            />
                        </Typography.Title>
                    ) : (
                        <Typography.Title
                            style={{ color: randomColor() }}
                            className="logo"
                            onClick={onHomeClick}
                        >
                            <img
                                className="logo-img"
                                alt={logoColored}
                                src={logoColored}
                            />
                            Khayaali Pulao
                        </Typography.Title>
                    )}

                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        style={{ background: "#202025" }}
                    >
                        <Menu.Item
                            key="1"
                            onClick={onHomeClick}
                            icon={<HomeOutlined />}
                        >
                            Khayaali Pulao Today
                        </Menu.Item>
                        <Menu.Item
                            key="2"
                            icon={<SendOutlined />}
                            onClick={onPostClick}
                        >
                            Post a Khayaal
                        </Menu.Item>
                        <Menu.Item key="3" icon={<TagsOutlined />}>
                            Khayaali Pulao Menu
                        </Menu.Item>
                        <Divider />
                        <Menu.Item
                            key="4"
                            onClick={onAboutClick}
                            icon={<QuestionOutlined />}
                        >
                            Wait! What?
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout
                    className="site-layout"
                    style={collapsed ? { marginLeft: 80 } : { marginLeft: 200 }}
                >
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {collapsed ? (
                            <div>
                                <MenuUnfoldOutlined
                                    className="trigger"
                                    onClick={() => setCollapsed(!collapsed)}
                                />
                            </div>
                        ) : (
                            <div>
                                <MenuFoldOutlined
                                    className="trigger"
                                    onClick={() => setCollapsed(!collapsed)}
                                />
                            </div>
                        )}
                        <Search
                            placeholder="See a Khayaal?"
                            onSearch={(value) => console.log(value)}
                            enterButton
                            style={{
                                minWidth: 150,
                                maxWidth: 500,
                                margin: "0 1rem",
                            }}
                        />
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                        }}
                    >
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/post" component={Post} />
                            <Route path="/about" component={About} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default App;
