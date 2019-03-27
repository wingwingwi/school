/*!
 *
 * 服务URL
 */

var PRD = 1, STG = 2;//服务器环境设置
var BDBaseUrl = '';//基础设定
let ENVIROMENT = PRD;//设置信息

switch (ENVIROMENT) {
    case PRD :
        BDBaseUrl = 'https://a1.hflxkj.top/campusApi'
        break;
    case STG:
        BDBaseUrl = 'https://a1.hflxkj.top/campusApi'
        break;
}


module.exports = {
    BDBaseUrl: BDBaseUrl,
    IMG_URL: '',
    /**1.关于我们 POST*/
    URL_LIST: BDBaseUrl + "/dic/about",
    /**2.首页广告图查询  POST*/
    URL_BANNERS: BDBaseUrl + "/dic/banners",
    /**2.班级查询  POST*/
    URL_QUERY_CLASS: BDBaseUrl + "/dic/queryClass",
    /**2.查询主要症状或疾病名称  POST*/
    URL_QUERY_DISEASE: BDBaseUrl + "/dic/queryDisease",
    /**2.查询班主任快捷消息模板  POST*/
    URL_QUERY_NETE_TEMPLATE: BDBaseUrl + "/dic/queryNoteTemplate",
    /**2. 学校查询 POST*/
    URL_QUERY_SCHOOL: BDBaseUrl + "/dic/querySchool",
    /**2.省市区街道级联查询 POST*/
    URL_QUERY_AREA: BDBaseUrl + "/dic/selectArea",

// 用户管理
// 个人中心/学生认证/短信/登陆/注册/意见反馈等
    /**2.意见反馈  POST*/
    URL_ADD_OPINION: BDBaseUrl + "/member/addOpinion",
    /**2.学生认证  POST*/
    URL_ADD_STUDENT: BDBaseUrl + "/member/addStudent",
    /**2.用户登陆  POST*/
    URL_DOLOGIN: BDBaseUrl + "/member/doLogin",
    /**2.个人账号信息  POST*/
    URL_MY_DATA: BDBaseUrl + "/member/myData",
    /**2.新用户注册  POST*/
    URL_REGISTER: BDBaseUrl + "/member/register",
    /**2.获取手机验证码  POST*/
    URL_SEND_CODE: BDBaseUrl + "/member/sendCode",
    /**2.修改个人资料  POST*/
    URL_UPDATE_MENBER: BDBaseUrl + "/member/updateMember",
    /**2.修改密码  POST*/
    URL_UPDATE: BDBaseUrl + "/member/updatePwd",

    // 资讯管理
    // 对资讯的管理
    /**2.去评论  POST*/
    URL_ADD_COMMENT: BDBaseUrl + "/news/addComment",
    /**2. 查询评论列表 POST*/
    URL_QUERY_COMMENT: BDBaseUrl + "/news/queryComment",
    /**2.查询资讯列表  POST*/
    URL_QUERY_PAGE: BDBaseUrl + "/news/queryPage",
    /**2.点赞/取消点赞  POST*/
    URL_THUMBS: BDBaseUrl + "/news/thumbs",
    /**2.查询资讯详情  POST*/
    URL_NEWS_DETAIL: BDBaseUrl + "/news/toDetail",

    // 附件管理
    // File Controller
    /**2.文件上传  POST*/
    URL_UPLOAD: BDBaseUrl + "/file/upload",
    /**2.更新个人档案  POST*/
    URL_ADD_ARCHIVES: BDBaseUrl + "/archives/addArchives",
    URL_ARCHIVES_LIST: BDBaseUrl + "/archives/list",
    /**2.个人档案查询  POST*/
    URL_MY_ARCHIVES: BDBaseUrl + "/archives/toDetail",
    // 消息
    /**2.查询消息列表  POST*/
    URL_MSG_LIST: BDBaseUrl + "/msg/list",
    /**2.消息已读操作  POST*/
    URL_MSG_DOREAD: BDBaseUrl + "/msg/doRead",
    /**2.查询消息数  POST*/
    URL_MSG_MYMSG: BDBaseUrl + "/msg/myMsg",

    //请假管理
    // 请假流程管理
    /**2. 请病假 POST*/
    URL_LEAVE_ILLNESS: BDBaseUrl + "/leave/addIllnessLeave",
    /**2. 请事假 POST*/
    URL_LEAVE_MATTER: BDBaseUrl + "/leave/addMatterLeave",
    /**2.【班主任端】班主任发送通知  POST*/
    URL_: BDBaseUrl + "/leave/sendNote",
    /**2.病假复课  POST*/
    URL_ILLNESS_RESUME: BDBaseUrl + "/resume/addIllnessResume",
    /**2.事假复课  POST*/
    URL_MATTER_RESUME: BDBaseUrl + "/resume/addMatterResume",
    /**2.事假/病假 详情  POST*/
    URL_LEAVE_DETAILS: BDBaseUrl + "/leave/details",
    /**2. 【班主任端】今日出勤状况 POST*/
    URL_ATTENDANCE: BDBaseUrl + "/leave/attendance",
    /**2.事假/病假 历史查询  POST*/
    URL_QUERY_LEAVES: BDBaseUrl + "/leave/queryLeaves",
    /**2.事假/病假 历史查询  POST*/
    URL_LIST_LEAVES: BDBaseUrl + "/leave/listLeaves",
    /**2.班主任端】班主任发送通知  POST*/
    URL_SEND_NOTE: BDBaseUrl + "/leave/sendNote",
    /**2.【班主任端】今日请假状况  POST*/
    URL_TOADY_LEAVES: BDBaseUrl + "/leave/todayLeaves",
    /**2.  POST*/
    URL_: BDBaseUrl + "",
    /**2.  POST*/
    URL_: BDBaseUrl + "",
    /**2.  POST*/
    URL_: BDBaseUrl + "",
    /**2.  POST*/
    URL_: BDBaseUrl + "",

};

