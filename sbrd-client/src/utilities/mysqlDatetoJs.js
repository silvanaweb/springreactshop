function mysqlDateToJs(mysql_date){
  const options = { year: "numeric", month: "long", day: "numeric"}
  return new Date(mysql_date).toLocaleDateString(undefined, options)
}

export default mysqlDateToJs;