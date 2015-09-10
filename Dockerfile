FROM ubuntu:14.04
MAINTAINER Alex Nishikawa <alex.d.nishikawa@gmail.com>

RUN apt-get update

RUN apt-get install -y nodejs npm 