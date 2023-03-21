```c
#pragma once
#include <stdlib.h>
#include <assert.h>
#include <errno.h>
#include <stdio.h>

struct book {
    char title[10];
};

struct books {
    struct book* data;
    int size;
    int capacity;
};

int int_array_reserve(struct books* p, int n)
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

int books_push(struct books* p, struct book* book)
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

    p->data[p->size] = *book;
    p->size++;

    return 0;
}

void books_destroy(struct books* p)
{
    free(p->data);
}

int main()
{
    struct books books = { 0 };

    struct book book = { .title = "title 1" };
    books_push(&books, &book/*MOVED*/);
    struct book book2 = { .title = "title 2" };
    books_push(&books, &book2/*MOVED*/);
    
    books_destroy(&books);

}


```
