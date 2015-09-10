FROM ubuntu:13.10
MAINTAINER Alex Nishikawa <alex.d.nishikawa@gmail.com>

RUN apt-get update

RUN apt-get install -y nodejs npm git git-core