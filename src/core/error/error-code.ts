export enum XLS_ERROR_CODE_SET {
    FILE_TYPE_ERROR = 0,
    JSON_FORMAT_ERROR = 1,

    PATH_ERROR = 2, // 路径错误 找不到文件
    EMPTY_ERROR = 3, // VNode 节点不能为空
    COMPILE_ERROR = 4, // 编译语句时的错误
    
    POTATO_VAR_NOT_FOUND = 5, // 没有找到变量identifier
    POTATO_INVALID_INVOKE = 6,
    POTATO_VAR_IDENTIFIER_REPEAT = 7
};