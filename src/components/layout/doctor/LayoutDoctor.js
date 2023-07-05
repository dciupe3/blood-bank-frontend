import MainNavigationDoctor from "./MainNavigationDoctor";

function LayoutDoctor(props) {
  return (
    <div>
      <MainNavigationDoctor />
      {props.children}
    </div>
  );
}

export default LayoutDoctor;
