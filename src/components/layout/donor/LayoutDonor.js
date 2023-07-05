import MainNavigationDonor from "./MainNavigationDonor";

function LayoutDonor(props) {
  return (
    <div>
      <MainNavigationDonor />
      {props.children}
    </div>
  );
}

export default LayoutDonor;
