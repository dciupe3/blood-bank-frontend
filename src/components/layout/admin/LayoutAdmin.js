import MainNavigationAdmin from "./MainNavigationAdmin";

function LayoutAdmin(props) {
  return (
    <div>
      <MainNavigationAdmin />
      {props.children}
    </div>
  );
}

export default LayoutAdmin;
