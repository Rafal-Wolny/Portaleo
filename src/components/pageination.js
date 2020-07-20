import React from 'react';
import ReactNextPaging from 'react-next-paging';

const buttonStyles = {
  border: '1px solid #62b4de',
  background: '#dce5e8',
  fontSize: '0.9em',
  width: 45,
  height: 22,
  fontFamily: 'Open Sans',
  fontWeight: 'bold',
  margin: 8,
};

const PaginacionTabla = ({itemsperpage, nocolumns, items, pagesspan}) => {
  return (
    <ReactNextPaging
      itemsperpage={itemsperpage}
      nocolumns={nocolumns}
      items={items}
      pagesspan={pagesspan}
    >
      {({
        getBackButtonProps,
        getFastBackButtonProps,
        getFwdButtonProps,
        getFastFwdButtonProps,
        getSelPageButtonProps,
        nopages,
        inipagearray,
        pagesforarray,
        currentpage,
        noitems,
        initialitem,
        lastitem,
        goBackBdisabled,
        goFastBackBdisabled,
        goFwdBdisabled,
        goFastFwdBdisabled,
      }) => (
        <tbody>
          {items.slice (initialitem, lastitem).map ((item, index) => {
            return item;
          })}
          {noitems > 0
            ? [
                <tr key={'pagingrow' + 100}>
                  <td
                    className="last-td"
                    colSpan={nocolumns}
                    style={{textAlign: 'center'}}
                  >
                    <button
                      style={buttonStyles}
                      {...getFastBackButtonProps ()}
                      disabled={goFastBackBdisabled}
                    >
                      {'<<'}
                    </button>
                    <button
                      style={buttonStyles}
                      {...getBackButtonProps ()}
                      disabled={goBackBdisabled}
                    >
                      {'<'}
                    </button>
                    {Array.from (
                      {length: pagesforarray},
                      (v, i) => i + inipagearray
                    ).map (page => {
                      return (
                        <button
                          className="button-pagination"
                          key={page}
                          {...getSelPageButtonProps ({page: page})}
                          disabled={currentpage === page}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      style={buttonStyles}
                      {...getFwdButtonProps ()}
                      disabled={goFwdBdisabled}
                    >
                      {'>'}
                    </button>
                    <button
                      style={buttonStyles}
                      {...getFastFwdButtonProps ()}
                      disabled={goFastFwdBdisabled}
                    >
                      {'>>'}
                    </button>
                  </td>
                </tr>,
              ]
            : null}
        </tbody>
      )}
    </ReactNextPaging>
  );
};

export default PaginacionTabla;
