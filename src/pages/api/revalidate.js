
// isr 动态生成接口
export default function (req, res) {

    // 权限检验
    if(req.query.secret!='aaaa'){
        return res.status(401).json({ msg: 'Insufficient authority' })
    }

    try {
        // 需要重新生成的 url
        res.revalidate(`/isr/${req.query.id}`)
        res.status(200).json({ revalidate: true})
    } catch (error) {
        res.status(500).send({ msg: 'Error revalidate' })
    }
}