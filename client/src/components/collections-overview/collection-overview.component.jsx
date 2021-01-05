import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import  CollectionPreview  from "../preview-collection/collection-preview.component"
import { selectCollectionForPreview } from "../../redux/shop/shop.selector"
import "./collection-overview.styles.scss"

const CollectionsOverview = ({ collections }) => {
    return (
        <div className="collections-overview">
                {
                    collections.map(({id, ...otherCollectionProps}) => (
                        <CollectionPreview key={id} {...otherCollectionProps}/>
                    ))
                }
        </div>
    )
}
const mapStateToProps =  createStructuredSelector({
    collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)