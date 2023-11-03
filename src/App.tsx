import React, { useEffect } from 'react';

function App() {
  //! you can use useEffect for fetching the data from the server and subscribing to events
  // useEffect(() => {
  //   const subscription = subscribeToData();

  //   // Cleanup function
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  //! the useEffect does rerender the component, but it does not block the rendering of the component
  //! so you can fetch data and in between the data fetching you can render the component and change its data and state

  //! useEffect with empty array as second argument will run only once after the component is mounted and then not again

  //! useEffect can be used to fetch the data from API and automatically trigger when dependencies like filters change
  // useEffect(() => {
  //   const fetchData = async () => {
  //     fetchWithFilters(filters).then(result => {
  //     setData(result.data);
  //   };
  //   fetchData();
  // }, [filters]);

  //!  how to do "cleanup" in useEffect? for example unsubscribe from listener or other stuff
  //!  return the cleanup function from the useEffect
  // useEffect(() => {
  //   const subscription = subscribeToData();
  //  return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  //! when does the useEffect cleanup run? 
  //! -when the component is unmounted
  //! -before the useEffect runs again(this means if any dependency changes)

  const [count, setCount] = React.useState(0);
  // this is the example where the useEffect runs only once and it works like componentDidMount
  useEffect(() => {
    console.log("effect run");
    // after one second increment the count
    const timer =  setInterval(() => {
      console.log("timer fired");
      setCount((prevCount) => prevCount + 1);
    }
    , 1000);
    return () => {
      console.log("cleanup runs");
      clearInterval(timer);
    }
  }, []);


  return (
    <div className="App">
      <h1>Count: {count}</h1>
      {/* we can even change the value of count outside of the useEffect and it will still work
      you may be asking why and it is because:
      -the useEffect runs after the component is rendered
      and then in setState it uses the previousValue + 1
      if we tried to make some internal state in useEffect and then change it outside of useEffect
      it would not work because the useEffect would not know about the change and would not rerender
      */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>reset to 0</button>
    </div>
  );
}

export default App;
