function Title(props) {
  return <h1>{props.title}</h1>;
}

function Container(props) {
  return (
    <div className="container d-flex justify-content-center align-item-center">
      <div className="col-8">{props.children}</div>
    </div>
  );
}

function Button(props) {
  return (
    <button onClick={props.onClick} type={props.type} className={`btn btn-${props.color}`} data-test="limpar-dados">
      {props.title}
    </button>
  );
}

function Input(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        className="form-control"
        data-test="entrada"
      />
    </div>
  );
}

function Card(props) {
  return (
    <div className="card border-secondary mb-8">
      <div className="card-header">
        {props.title}
        <Button title="Apagar históricos" color="light" onClick={props.onClickDeleteAll} />
      </div>
      <div className="card-body text-secondary">{props.children}</div>
    </div>
  );
}

function Form(props) {
  return (
    <form onSubmit={props.onSubmit}>
      {props.inputs.map((input, index) => {
        return (
          <Input
            key={index}
            name={input.name}
            value={input.value}
            onChange={input.onChange}
            type={input.type}
            label={input.label}
          />
        );
      })}
    </form>
  );
}

function Table(props) {
  return (
    <span>
      <table className="table">
        <thead>
          <tr>
            {props.head.map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.palindromo}</td>
                <td data-verificado={item.resultado}>{item.valor}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </span>
  );
}

function App() {
  const [palindromo, setPalindromo] = React.useState("");
  const [palindromos, setPalindromos] = React.useState([]);
  const handlePalindromo = onChangeEvent =>
    setPalindromo(onChangeEvent.target.value);
  const handleSubmit = event => {
    event.preventDefault(); //não recarrega a página
    if (!palindromo.replace(/\s+/g, '')){
      setPalindromo("");
      return;
    }        
    const result = verifyPalindrome(palindromo);

    const newPalindromo = {
      palindromo: palindromo,
      valor: result,
      resultado: result === "Sim" ? "positivo" : "negativo"
    };
    const newPalindromos = palindromos.concat(newPalindromo);
    setPalindromos(newPalindromos);
    setPalindromo("");
  };

    function verifyPalindrome(str) {
      const regex = /[\W_]/g;
      let lowRemoveStr = str.toLowerCase().replace(regex, '');
      let reverseStr = lowRemoveStr.split('').reverse().join(''); 
      return reverseStr === lowRemoveStr ? 'Sim' : 'Não';
  }

  const handleClickDeleteAll = () => {
    setPalindromos([]);
  };

  const inputs = [
    {
      label: "",
      type: "text",
      value: palindromo,
      name: "palindromo",
      onChange: handlePalindromo
    }
  ];
  const head = ["Frase", "Palíndromo"];

  return (
    <Container>
      <Card title="Palíndromo" onClickDeleteAll={handleClickDeleteAll}>
        <Form inputs={inputs} onSubmit={handleSubmit} />
        <Table head={head} rows={palindromos} />
      </Card>

      {/* <section>
        <Title title="Insira um produto" />
        <Form inputs={inputs} onSubmit={handleSubmit} />
      </section>
      <section>
        <Title title="Produtos cadastrados" />
        <p>{loading ? "Loading..." : ""}</p>
        <Table
          head={head}
          rows={produtos}
          onClickDeleteAll={handleClickDeleteAll}
          onClickDelete={handleClickDelete}
        />
      </section> */}
    </Container>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
