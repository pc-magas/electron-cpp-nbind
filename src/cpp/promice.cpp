#include"promice.h"

#include <iostream>
#include<thread>
#include <chrono>

void MyPromice::exec(){
    std::this_thread::sleep_for(std::chrono::milliseconds(200));
}