```c

#pragma once
#include <stdlib.h>
#include <assert.h>
#include <errno.h>
#include <stdio.h>

struct int_array {
    int* data;
    int size;
    int capacity;
};

int int_array_reserve(struct int_array* p, int n)
{    
    if (n > p->capacity) {

        static_assert(sizeof(p->data[0]) < INT_MAX, 
                     "we assume sizeof data is less than int max");        
        
        static_assert((size_t)INT_MAX * (size_t)INT_MAX < SIZE_MAX,
                      "we assume size_t is 2x bigger than int, consequently will not overflow");

        
        const size_t new_size_bytes = n * sizeof(p->data[0]);
        void* pnew = realloc(p->data, new_size_bytes);
        if (pnew)
        {
            p->data = pnew;
            p->capacity = n;
        }
        else
        {
            return ENOMEM;
        }
    }

    return 0;
}

int int_array_push(struct int_array* p, int value)
{
    if (p->size == INT_MAX) {        
        return EOVERFLOW;
    }

    if (p->size + 1 > p->capacity) {

        unsigned long long new_capacity = 
            p->capacity + p->capacity / 2;
        
        
        if (new_capacity < p->size + 1)
        {
            //cover first and second insertion
            new_capacity = p->size + 1;
        }
        else if (new_capacity > INT_MAX)
        {
            //cover last possible insertion
           new_capacity = INT_MAX;
        }

        int error = int_array_reserve(p, (int)new_capacity);
        if (error != 0) {
            return error;
        }
    }

    p->data[p->size] = value;
    p->size++;

    return 0;
}

void int_array_destroy(struct int_array* p)
{
    free(p->data);
}

int main()
{
    struct int_array a = { 0 };
    int_array_push(&a, 1);    
    int_array_push(&a, 2);
    int_array_destroy(&a);
}

```



