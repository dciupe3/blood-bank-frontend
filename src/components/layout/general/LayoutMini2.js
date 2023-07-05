import classes from './LayoutMini2.module.css';

function LayoutMini2(props) {
  return (
    <div>
      {<main className={classes.main}>{props.children}</main>}
    </div>
  );
}

export default LayoutMini2;
