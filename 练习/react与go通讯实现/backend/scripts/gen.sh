echo "็ๆ rpc server ไปฃ็ "

OUT=../pb
protoc \
--go_out=${OUT} \
--go-grpc_out=${OUT} \
--go-grpc_opt=require_unimplemented_servers=false \
common.proto backend.proto push.proto




