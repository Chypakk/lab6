import React from "react";
import ReactDOM from "react-dom";

class Avatar extends React.Component {
  render() {
    const { src } = this.props;

    return <img src={src} alt="" />;
  }
}

class Button extends React.Component {
  render() {
    const { label, start } = this.props;
    return (
      <div>
        <button type="button" onClick={start} class="btn btn-primary">
          {label}
        </button>
      </div>
    );
  }
}

class Preloader extends React.Component {
  render() {
    return <div> Загрузка... </div>;
  }
}

class UsersCard extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Avatar src={data.picture.large} />
        <div>{`${data.name.first} ${data.name.last}`}</div>
      </div>
    );
  }
}

class UsersList extends React.Component {
  render() {
    const { user } = this.props;
    return <div>{user && user.map(u => <UsersCard data={u} />)}</div>;
  }
}

class App extends React.Component {
  state = { user: undefined, loading: false };

  async gettusers() {
    this.setState({ loading: true });
    const response = await fetch("https://randomuser.me/api/?results=10");
    const results = await response.json();

    this.setState({ user: results.results, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <Preloader />;
    return (
      <div>
        <Button start={() => this.gettusers()} label={"Получить данные"} />
        <div>
          <UsersList user={user} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
