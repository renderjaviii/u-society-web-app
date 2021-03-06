import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

import {connect} from 'react-redux';
import {searchGroupsCreator} from "../../store/group/groupActions";
import {loadCategoriesCreator} from "../../store/category/categoryActions";
import {useStyles} from "../../hooks/useStyles";
import * as actionTypes from "../../store/actionsTypes";
import Loader from "../../components/Loader/Loader";
import CustomTable from "../../components/CustomTable/CustomTable";
import PageError from "../../components/PageError/PageError";

function SearchGroup(props) {
    const classes = useStyles();

    const [query, setQuery] = useState({
        'groupName': '',
        'categoryId': '',
    });

    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'Descubre grupos de tu interés'}});
        props.dispatch(loadCategoriesCreator());
    }, []);

    const rows = props.groupState.groups;

    const handleSearchButtonClick = () => {
        props.dispatch(searchGroupsCreator(query));
    };

    const handleCategoryItemClick = categoryId => {
        setQuery({...query, categoryId: categoryId});
    };

    const handleClosePageError = () => {
        props.dispatch({type: actionTypes.RESET_ERROR})
    };

    const handleChange = e => {
        setQuery({...query, groupName: e.target.value});
    };

    return (
        <>
            <Container component="main" maxWidth={"md"} className={classes.container}>
                <Loader isOpen={props.groupState.isLoading || props.categoryState.isLoading}/>
                <PageError
                    isOpen={props.groupState.hasError || props.categoryState.hasError}
                    onclose={handleClosePageError}
                    errorDescription={props.groupState.errorDescription || props.categoryState.errorDescription}/>

                <Grid container spacing={1}>
                    <Grid container>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="groupName"
                            label="Nombre del grupo"
                            name="nombre"
                            autoComplete="lname"
                            onChange={e => handleChange(e)}
                            type="search"
                        />
                    </Grid>

                    <FormControl className={classes.formControl} fullWidth style={{marginTop: '10px'}}>
                        <InputLabel id="category">Categoría</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            defaultValue='none'
                        >
                            <MenuItem value="none" disabled>
                                Selecciona una categoría
                            </MenuItem>
                            {props.categoryState.categories.map(category =>
                                (<MenuItem
                                    key={category.id}
                                    id={category.id}
                                    value={category.id}
                                    onClick={categoryId => handleCategoryItemClick(category.id)}
                                >{category.name}
                                </MenuItem>)
                            )}
                        </Select>
                    </FormControl>

                    <Grid container item xs={12} spacing={3} style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{marginTop: '30px', backgroundColor:'var(--primary)'}}
                            onClick={handleSearchButtonClick}
                        >
                            Buscar
                        </Button>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                    </Grid>
                </Grid>
            </Container>
            <CustomTable rows={rows} buttonText='Visualizar'/>
        </>

    );
}

const mapStateToProps = state => {
    return {
        categoryState: state.category,
        groupState: state.group,
    }
};

export default connect(mapStateToProps)(SearchGroup);