import classes from './LayoutMap.module.css';

function LayoutMap(props) {
  return (
    <div>
      {<main className={classes.main}>{props.children}</main>}
    </div>
  );
}

export default LayoutMap;
