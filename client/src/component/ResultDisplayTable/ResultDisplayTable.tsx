import './ResultDisplayTable.css'
import { ResultDisplayTableProps } from "src/type/interface/ResultDisplayTableProps"

const ResultDisplayTable:React.FC<ResultDisplayTableProps> = ({dataResult})=>{
    const typeTranslate = (type:string): string =>{
        switch(type){
            case 'object': return 'text'

            case 'datetime64[ns]': return 'date'
            case 'timedelta64[ns]': return 'time-span'

            case 'int64': 
            case 'Int64':
            return 'integer'

            case 'bool': return 'True_or_False'
            case 'float64': return 'floating-point-number'
            case 'complex128': return 'complex-number'

            default: return type;
        }
    }

    return(
        <>
        
        <table className="tb-style">
        <thead>
            
        <tr>
           {dataResult && Object.keys(dataResult[0]).map((item, index)=>( 
                <th key={index}>{item}</th>      
            ))}
        </tr>
        </thead>
        <tbody>
        {dataResult && dataResult.map((item, index) => (
        <tr key={index}>
        {Object.keys(item).map((key) => {
            const translated_type = typeTranslate(item[key])
          return(
          <td key={key}>{translated_type}</td>
          )
        })}
      </tr>
    ))}
  </tbody>        
        </table>
        </>
    )
}

export default ResultDisplayTable