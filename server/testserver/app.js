const express = require('express')
const app = express()
const port = 8888

app.get('/', (req, res) => res.json({
    code:"200",
    message:"请求成功"
}))

app.post('/departmentDoctorTree', (req, res) => res.json([{
    id:'1',
    label: '口腔科',
    children: [{
        id:'1-1',
        label: '口腔外科',
        children: [{
            id:'1-1-1',
            label: '徐光宙'
        },{
            id:'1-1-2',
            label: '任志强'
        }]
    },{
        id:'1-2',
        label: '牙槽修复科',
        children: [{
            id:'1-2-1',
            label: '董国志'
        },{
            id:'1-2-2',
            label: '乔杉'
        }]
    }]
}, {
    id: '2',
    label: '骨科',
    children: [{
        id: '2-1',
        label: '头骨科',
        children: [{
            id: '2-1-1',
            label: '董成鹏'
        }]
    }, {
        id: '2-2',
        label: '颈椎骨科',
        children: [{
            id: '2-2-1',
            label: '刘老根'
        }]
    }]
}]))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
