import classes from './LayoutMini.module.css';

function LayoutMini(props) {
  return (
    <div>
      {<main className={classes.main}>{props.children}</main>}
    </div>
  );
}

export default LayoutMini;
