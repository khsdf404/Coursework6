#!/bin/bash
JAVA_HOME=/usr/lib/jvm/java-1.17.0-openjdk-amd64 && mvn clean install && java -jar ./target/live-v1.jar
