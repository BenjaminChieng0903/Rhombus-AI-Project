import pandas as pd

def infer_and_convert_data_types(df):
    for col in df.columns:
        #In the mixed data situation for bool, pd will predicate it as object.
        #So that we need to check if bool strings are in the column.
        #For columns that only have bool string, pd will predicate its type correctly.
        bool_in_col = df[col].isin(['True','False','true','false','TRUE','FALSE'])
        if bool_in_col.any():
            #If True amount > False amount in , we can assume it is a bool type
            #If True amount < False -> bool strings are minority in the column -> should not be bool type because of mixed data
            true_count = bool_in_col.sum()
            all_count = len(bool_in_col)
            if true_count > all_count-true_count:
                
                #convert value to bool based on default rules
                df[col] = df[col].apply(convert_to_bool)
                continue

        # Check if the column should be categorical
        # Example threshold for categorization
        if len(df[col].unique()) / len(df[col]) < 0.5:
            df[col] = pd.Categorical(df[col])
            continue

        # Attempt to convert to numeric first
        df_converted_numeric = pd.to_numeric(df[col], errors='coerce')
        #if amount of number value greater than nan, then we think this might be a numeric type
        #Otherwise number is a moniority in the column -> should not to be numeric type
        nan_count = df_converted_numeric.isna().sum()
        numeric_count = df_converted_numeric.count()

        if numeric_count > nan_count:
            df[col] = df_converted_numeric
            
            #if we have nan value, then if all int, then type is int, if all float, then type is float, if have both, then float
            #if values exclusive of nan value are all int type, we predict its type as int
            #Otherwise float
            if  nan_count > 0 and df[col].dropna().apply(float.is_integer).all():
                df[col] = df[col].astype('Int64')
                continue
            
            continue

        # Attempt to convert to datetime
        # For to_datetime function, it will convert all the values that are not can be converted to date to nat value
        # for mxied dataset, we can count the amount of nat value and compare to the rest
        # in this case, the amount of nat value is number of dirty data, while the rest is date data
        # df_converted_datetime = pd.to_datetime(df[col], errors='coerce')
        df_converted_datetime = df[col].apply(convert_to_datetime_include_excel)
        nat_count = df_converted_datetime.isna().sum()
        if len(df_converted_datetime)-nat_count > nat_count:
            df[col] = df_converted_datetime
            continue
        
        #Attempt to convert to datedelta
        #The same logic with datetime
        df_converted_datedelta = pd.to_timedelta(df[col], errors='coerce')
        nat_count = df_converted_datedelta.isna().sum()
        if len(df_converted_datedelta)-nat_count > nat_count:
            df[col] = df_converted_datedelta
            continue
        
        #Attempt to convert to complex
        #if any value has string 'j'
        if df[col].str.contains('j', na=False).any():
            #complex data count
           complex_count = df[col].str.contains('j', na=False).sum()
            #Other mixed data count
           mixed_data_count = len(df[col]) - complex_count
           if complex_count > mixed_data_count:
            df[col] = df[col].astype(complex)

    return df

def convert_to_bool(val):
    #check if value equal to nan
    if pd.isna(val):
        return False
    if isinstance(val, str):
        #it will automatically transfer number and other irrelvant string to bool
        return bool(val)
def convert_to_datetime_include_excel(value):
    try:
        #for datetime in excel, read_excel func will automatically convert date to timestamp
        #So this step is to check if some date data have been converted to timestamp
        if value.isdigit():
            return pd.to_datetime(int(value), origin='1899-12-30', unit='D')
        return pd.to_datetime(value, errors='coerce')
    except ValueError:
        return pd.NaT

#data processing api entry
def read_file_and_convert(file):
    
    #file type check
    if file.name.endswith('.csv'):
        df = pd.read_csv(file)
    if file.name.endswith('.xlsx'):
        df = pd.read_excel(file, dtype=str)
        # print(df['Birthdate'])
        # df['Birthdate'] = pd.to_datetime(df['Birthdate'], origin='1899-12-30', unit='D', errors='coerce')
        # print(df['Birthdate'])
    
    print("Data types before inference:")
    # print(df.dtypes)
    #encapulate result into dict
    dtypes_dict_before = df.dtypes.apply(lambda x: str(x)).to_dict()
    dtypes_dict_before['before_or_after'] = 'dtypes-before'

    infer_and_convert_data_types(df)

    print("\nData types after inference:")
    # print(df.dtypes)
    #encapulate result into dict
    dtypes_dict_after = df.dtypes.apply(lambda x: str(x)).to_dict()
    dtypes_dict_after['before_or_after'] = 'dtypes-after'

    #construct return data
    return [
        dtypes_dict_before,
        dtypes_dict_after
    ]